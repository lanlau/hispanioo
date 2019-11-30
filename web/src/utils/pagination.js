export const getPaginationSettings=(current_page=1,per_page=10,total=0)=>{
    const last_page = Math.ceil(total / per_page);
    current_page=parseInt(current_page)
    let from = (current_page - 1) * per_page;
    let to = current_page * per_page;

    return {
        per_page,
        current_page,
        total,
        from,
        to
    }
}
