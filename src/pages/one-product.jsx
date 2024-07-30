import { Helmet } from 'react-helmet-async';

import { SingleProduct } from 'src/sections/showProduct/view';
// ----------------------------------------------------------------------

export default function OneProduct() {
    return (
        <>
            <Helmet>
                <title> Product </title>
            </Helmet>

            <SingleProduct />
        </>
    );
}
