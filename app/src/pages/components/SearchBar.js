import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchBar({ title, keyword, onChange, onSubmit, onNew, placeholder="Pesquise por uma informação do processo" }) {
  return (
    <Grid container spacing={24}>
    
        <Grid item xs={12} sm={2} md={1}>
            <p className="Title Title--light Title--sm">{title}</p>
        </Grid>

        <Grid item xs={8} sm={5} md={6}>
          <form onSubmit={onSubmit}>
                <div className="Form-group">
                  <input
                    type="text"
                    value={keyword}
                    onChange={onChange}
                    className="Input-search Input-search--block"
                    placeholder={placeholder}/>
                  <button className="SubmitIcon" type="submit"><FontAwesomeIcon icon="search" /></button>
                </div>
          </form>
        </Grid>

        <Grid item xs={4} sm={5}md={5} className="p-l-0 p-r-0">
          <button className="btn-default" onClick={onNew}>Novo</button>
        </Grid>
    </Grid>
  );
}
export default SearchBar;
