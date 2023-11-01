import { useState, useEffect } from 'react';
import { useProducts, useProviders, useModal } from '@/hooks';
import { Input, Button, Preload, MenuSkeleton } from '@/components';
import { AddStockTable } from './AddStockTable';
import '../product-page.scss';
import { ProviderIcon, InfoIcon } from '@/assets/svg';

export function AddStock() {
  const { products, loading, getAllProducts } = useProducts();
  const [productsNoStock, setProductsNoStock] = useState([]);
  const [show, setShow] = useState(true);

  const noStockFiltered = products
    .filter(product => product.actual < product.min)
    .reduce((prev, current) => {
      return {
        ...prev,
        [current.proveedor.nombre]: !prev[current.proveedor.nombre]
          ? [current]
          : [...prev[current.proveedor.nombre], current],
      };
    }, {});

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleClick = provider => e => {
    setProductsNoStock(noStockFiltered[provider]);
    setShow(false);
  };

  console.log(productsNoStock);

  return (
    <div
      className={`add-stock-page flex flex-col pt-[1rem] min-[800px]:flex-row min-[800px]:gap-2 ${
        show ? 'open' : ''
      }`}
    >
      <div className='add-stock-page-menu flex flex-col gap-2 min-[800px]:pt-[4rem] min-[800px]:min-w-[12rem]'>
        {loading ? (
          <MenuSkeleton />
        ) : (
          <>
            <h3 className='text-[1rem] pb-2'>Selecciona un proveedor</h3>
            {Object.keys(noStockFiltered).map(provedor => (
              <button
                key={provedor}
                onClick={handleClick(provedor)}
                className='btn min-[800px]:justify-start'
              >
                {provedor}
                <div className='badge bg-primary text-base-100'>
                  {noStockFiltered[provedor].length}
                </div>
              </button>
            ))}
          </>
        )}
      </div>
      <div className='add-stock-page-content pt-5 min-[800px]:flex-1'>
        {productsNoStock.length ? (
          <>
            <button
              className='btn-select-provider btn btn-primary btn-block'
              onClick={() => setShow(true)}
            >
              <ProviderIcon className='[&>path]:fill-[white] w-[1.2rem] h-[1.2rem]' />
              Selecciona un proveedor
            </button>
            <h3 className='text-[1.5rem] pt-5 pb-2 flex items-center gap-3 pl-5'>
              Productos de {productsNoStock[0].proveedor.nombre}
            </h3>
            <AddStockTable
              data={productsNoStock}
              handleShow={setShow}
              setProductsNoStock={setProductsNoStock}
            />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center pt-[3rem] pb-[3rem] text-[1rem] text-center'>
            <InfoIcon className='w-[2rem] h-[2rem] mb-3 [&>path]:fill-secondary-content' />
            Para hacer un pedido
            <br />
            tienes que seleccionar un proveedor
          </div>
        )}
      </div>
      {/* <select
        className='w-full h-10 mb-5 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='proveedor'
        onChange={handleSelect}
      >
        <option value=''>Seleccionar proveedor</option>
        {providers.map(provider => (
          <option key={provider.id} value={provider.name}>
            {provider.name}
          </option>
        ))}
      </select>

      <div className={`${!provider && 'hidden'}`}>
        <h3 className='my-5 text-lg font-semibold'>
          Selecciona el producto a recargar
        </h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock minimo</th>
              <th>Stock actual</th>
              <th>Pedido</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(value => value.proveedor.nombre === provider)
              .filter(value => value.min > value.actual)
              .map(item => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.min}</td>
                  <td>{item.actual}</td>
                  <td>
                    <form className='flex items-center justify-center gap-5'>
                      <Input
                        name='cantidad'
                        type='number'
                        min={1}
                        placeholder=''
                        onChange={e => handleChange(item.id)(e)}
                        className='h-[2rem] w-[4.5rem] text-center px-1'
                      />
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <Button onClick={() => handleSubmit()}>Hacer pedido</Button>
      </div> */}
    </div>
  );
}