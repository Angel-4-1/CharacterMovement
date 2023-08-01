// Component that allow us to display the children or not based on a condition
export default function Show({
    when, 
    children
}){
    if ( when ) {
        return <>
            {children}
        </>
    } else {
        return <></>
    }
}