function ProductList({ data, title }: { data: any; title?: string }) {
  const products =
    data?.length > 0 ? (
      data.map((item: any, index: number) => {
        return <div key={index}>{item.name}</div>;
      })
    ) : (
      <div>There is no product.</div>
    );

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">{products}</div>
    </div>
  );
}

export default ProductList;
