import Categories from "@/components/Categories";

const Home = () => {
    return (
        <div className="outerBox">
            <div className="innerBox">
                <div className="text-center border-b">
                    <h1 className="h1 mb-3">Please mark your interests!</h1>
                    <p>We will keep you notified.</p>
                </div>
                <div className="py-5">
                    <h2 className="text-[18px] font-medium mb-9">My saved interests!</h2>
                    <Categories />
                </div>
            </div>
        </div>
    );
}

export default Home