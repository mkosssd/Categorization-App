import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function CustomPagination({ page }: { page: string | null }) {
    const pagination = []
    for (let i = 1; i <= 10; i++) {
        pagination.push(<PaginationItem className={cn(page && +page == i ? 'bg-slate-200 rounded' : '')} key={i}>
            <PaginationLink href={"?page=" + i}>{i}</PaginationLink>
        </PaginationItem>);
    }
    return (
        <Pagination>
            <PaginationContent>
                {page && +page > 1 && (<PaginationItem>
                    <PaginationPrevious href={"?page=" + (+page - 1)} />
                </PaginationItem>)}
                {pagination}
                {page && +page < 10 &&<PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    )
}
