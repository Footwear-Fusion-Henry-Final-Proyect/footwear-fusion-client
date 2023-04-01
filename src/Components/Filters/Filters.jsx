import { useEffect, useState } from "react";
import {
  getBrand,
  filterByBrand,
  getSize,
  filterBySize,
  getPrice,
  priceRangeSelector,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";

export default function Filters() {
  const dispatch = useDispatch();

  const allBrands = useSelector((state) => state.brands);
  const allSizes = useSelector((state) => state.sizes);
  const allPrices = useSelector((state) => state.prices);
  
  const minPrice = (allPrices ? allPrices[0] : "no existe");
  const maxPrice = allPrices ? allPrices[allPrices.length - 1] : "no existe";


  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPrice());
  }, [dispatch]);

  const [searchBrand, setSearchBrand] = useState("");
  const [searchSize, setSearchSize] = useState("");

  const handleSearchBrand = (e) => {
    setSearchBrand(e.target.value);
  };
  const handleSearchSize = (e) => {
    setSearchSize(e.target.checked);
  };

  const handleBrandFilter = (e) => {
    if (e.target.checked) {
      dispatch(filterByBrand(e.target.value));
    } else {
      dispatch(filterByBrand(""));
    }
  };

  const handleSizeFilter = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      dispatch(filterBySize(value));
    } else {
      dispatch(filterBySize(""));
    }
  };

  /* esto es parte del slider de precios  */

  const [value, setValue] = useState([minPrice, maxPrice]);

  function valuetext(value) {
    return "$ " + value;
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApplyFilter = () => {
    dispatch(priceRangeSelector({ minPrice: minPrice, maxPrice: maxPrice }));
  };

  /* esto es parte del slider de precios  */

  return (
    <div className="filtros">
      <div className="filtro-adentro">
        <h3>MARCA</h3>
        <input
          type="text"
          placeholder="Buscar por marca..."
          value={searchBrand}
          onChange={handleSearchBrand}
        />
        <ul>
          {allBrands?.map((marca) => (
            <li key={marca}>
              <input
                id={marca}
                type="checkbox"
                value={marca}
                onClick={handleBrandFilter}
              />
              {"    "}
              {marca}
            </li>
          ))}
        </ul>
        {/* <button onClick={handleBrandFilter}>APLICAR</button> */}
      </div>

      <div className="filtro-adentro">
        <h3>TALLE</h3>
        <input
          type="text"
          placeholder="Buscar por talle..."
          value={searchSize}
          onChange={handleSearchSize}
        />
        <ul>
          {allSizes?.map((talle) => (
            <li key={talle}>
              <input
                id={talle}
                className="cb"
                type="checkbox"
                value={talle}
                onClick={handleSizeFilter}
              />
              {"    "}
              {talle}
            </li>
          ))}
        </ul>
        {/* <button onClick={handleSizeFilter}>APLICAR</button> */}
      </div>

      <div className="filtro-adentro">
        <h3>RANGO DE PRECIOS</h3>
        <Slider
          className="precios"
          step={1000}
          getAriaLabel={() => "Rango de Precio"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={minPrice}
          max={maxPrice}
        />
        <button onClick={handleApplyFilter}>APLICAR</button>
      </div>
    </div>
  );
}
