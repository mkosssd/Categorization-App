'use server'

import { cookies } from 'next/headers'
import { ID, Query } from 'node-appwrite'
import { createAdminClient, createSessionClient } from '../server/appwrite'
import { parseStringify } from '../utils'

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID
} = process.env

export const getUserInfo = async ({ userId }: { userId: string }) => {
  try {
    const { database } = await createAdminClient()
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    
    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

export const SignIn = async (userData: { email: string; password: string }) => {
  const { email, password } = userData

  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)
    const cookiesObj = await cookies()
    cookiesObj.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    const user = await getUserInfo({ userId: session.userId })
    return parseStringify(user)
  } catch (error) {
    console.log('Error:', error)
  }
}

export const SignUp = async ({ password, ...userData }: {password: string, email: string, name: string}) => {
  const { email, name } = userData
  let newUserAccount

  try {
    const { account, database } = await createAdminClient()

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${name}`
    )

    if (!newUserAccount) throw new Error('Error creating user')
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id
      }
    )

    const session = await account.createEmailPasswordSession(email, password)

    const cookiesObj = await cookies()
    cookiesObj.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })
    return parseStringify(newUser)
  } catch (error) {
    console.log('Error:', error)
  }
}
export async function getLoggedInUser () {
   try {
        const { account } = await createSessionClient()
        const result = await account.get()

        const user = await getUserInfo({userId: result.$id})
        return parseStringify(user)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createAdminClient()
    ;(await cookies()).delete('appwrite-session')
    return await account.deleteSession('current')
  } catch (error) {
    console.log(error)
  }
}

export const sendVerificationOTP = async () => {
    try {
      const { account } = await createSessionClient()
      const verificationResponse = await account.createVerification('http://localhost:3000/verify-user')
        
      return verificationResponse
    } catch (error) {
      console.error('Error sending verification email:', error)
      throw new Error('Failed to send verification email.')
    }
  }

export const verifyAccount = async () => {
  try {
    // const { account } = await createSessionClient()
    // return await account.updateVerification()
  } catch (error) {
    console.log(error)
  }
}
