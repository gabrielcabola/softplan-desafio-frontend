import React from 'react';


function SearchBar({ title, keyword, onChange, onSubmit, placeholder="Pesquise por uma informação do processo" }) {
  return (
    <div className="row">
    <div className="column-3">
        <p className="Title Title--light Title--sm">{title}</p>
    </div>
    <div className="column-9">
      <form onSubmit={onSubmit}>
          <input
            type="text"
            value={keyword}
            onChange={onChange}
            className="Input-search Input-search--block"
            placeholder={placeholder}/>
      </form>
    </div>
    <div className="column-12 p-l-0 p-r-0">
      <button className="btn-default">Novo</button>
    </div>
    </div>
  );
}
export default SearchBar;
