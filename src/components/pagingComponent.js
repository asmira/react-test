import { Button, ButtonGroup, Container } from "@mui/material";

const makePaging = (page={total:0, limit:10, offset:0}, pagePerPageSet = 5, setter) => {
    const {total, limit, offset} = page;
    const totalPage = Math.ceil(total/limit) || 1;
    const currentPage = Math.ceil(offset/limit)+1 || 1;
    const startPage = (Math.floor((currentPage-1) / pagePerPageSet) * pagePerPageSet + 1)|| 1;
    
    let endPage = Math.ceil(currentPage / pagePerPageSet) * pagePerPageSet;
    endPage = (endPage > totalPage) ? totalPage : endPage;
    const isStart = currentPage === 1;
    const isEnd = totalPage === currentPage;

    const btns = [];
    btns.push(<Button disabled={isStart} key={startPage-1} onClick={() => {setter((currentPage-2)*limit)}}>prev</Button>)
    for(let i=startPage; i <= endPage;i++) {
        let variant = (i === currentPage)?'outlined':'contained';
        btns.push(<Button variant={variant} key={i} onClick={()=>{setter((i-1)*limit);}}>{i}</Button>);
    }
    btns.push(<Button disabled={isEnd} key={endPage+1} onClick={() => {setter(currentPage*limit)}}>next</Button>)
    return btns;
}

const PagingLayout = (props) => {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {
                makePaging(props?.paging, props?.pagePerPageSet, props?.setter)
            }
        </ButtonGroup>)
}

export default PagingLayout;