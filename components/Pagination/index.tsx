import Link from "next/link";

type PaginationTypes = {
  pages: number,
  page: number,
  action?: any
}
export const Pagination = ({pages ,page, action}: PaginationTypes) => {
  const pagingItems = () => {
    const items = [];
    if(page === 1) {
      items.push(1);
      if(pages > 1){
        items.push(page +1);
      }
    }
    else if(page > 1 && page <= pages){
      if(page > 2) {
        items.push(1);
      }
      if(page > 3) {
        items.push(0);
      }
      if(page === pages) {
        items.push(page - 1, page)  
      } else {
      items.push(page - 1, page, page + 1);
      }
    }
    if(page < pages){
      if(page + 1 < pages - 1){
        items.push(0);
      }
      if(page + 1 !== pages){
        items.push(pages);
      }
    }
    return items;
  }

  return (
    <nav className="border-t border-gray-200 p-4 flex items-center justify-between sm:px-0">
      <div className="hidden md:-mt-px md:flex">
        {pagingItems().map((pageId, index)=>(
          pageId === 0 ? 
            <div key={index} className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>...</div>
            :
            action 
            ?
            <a 
              href="#"
              key={index}
              className={`${page === (pageId) ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
              onClick={action ? action : null}>
                {pageId}
            </a>
            :
            <Link key={index} href={`/products/ssg/${pageId}`}>
            <a 
              className={`${page === (pageId) ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
              >
                {pageId}
            </a>
            </Link>
        )
        )}
      </div>
</nav>
  )
}