// ItemList.jsx
import Item from './Item';

const ItemList = ({ products }) => {
    return (
        <section className="flex flex-wrap justify-center gap-6 p-6">
            {products.map(product =>
                <Item key={product.id} {...product} />
            )}
        </section>
    );
};

export default ItemList;
