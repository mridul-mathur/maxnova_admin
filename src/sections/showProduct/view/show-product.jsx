import { useEffect } from "react"
import { useParams } from "react-router";

export default function SingleProduct() {
    const { id } = useParams();
    useEffect(() => {
        console.log(id)
    },[])
    return (
        <div>
            ibfwonw;fe
        </div>
    );
}