export default function OrderPaginate() {
  return (
    <div className="order-paginate">
      <h5>Zapatillas 845 productos</h5>
      <div className="ordenar">
        <h5>Ordenar Por</h5>
        <select defaultValue="Mas Populares">
          <option value="Menos Populares">Menos Populares</option>
          <option value="Mayor Precio">Mayor Precio</option>
          <option value="Menor Precio">Menor Precio</option>
        </select>
      </div>

      <nav className="paginado">
    <h5>Pagina 1 de 16</h5>
        <ul>
          <li>
            <button>{"<<"}</button>
          </li>
          <a><li>1</li></a>
          <a><li>2</li></a>
          <a><li>3</li></a>
          <a><li>4</li></a>
          <a><li>5</li></a>

          <li>
            <button>{">>"}</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}