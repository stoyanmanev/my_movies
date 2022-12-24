import { AutoComplete } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import MoviesStore from "../../store/MoviesStore";
import { useNavigate } from "react-router-dom";

type Options = Array<{
  value: string;
  label: string;
}>;

const SearchBar: React.FC = () => {
  const optionsMovies: Options = MoviesStore.moviesNames.map(movie => ({value: movie, label: movie}))
  const [options, setOptions] = useState<Options>(optionsMovies);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (data: string) => {
    if(value.length > data.length){
      setOptions(prevState => prevState.filter(option => option.label.toLowerCase().includes(data)));
    }
    else if(options.length === 0){
      setOptions(optionsMovies.filter(option => option.label.toLowerCase().includes(data)))
    } else{
      setOptions(optionsMovies.filter(option => option.label.toLowerCase().includes(data)));
    }

    setValue(data);
  };


  const onSelectHandler = (value: string) => {
    navigate(`/movies/${value}`);
  }

  return (
    <AutoComplete
      value={value}
      options={options}
      placeholder="Search"
      style={{ width: 405 }}
      onChange={onChangeHandler}
      onSelect={onSelectHandler}
    />
  );
};

export default observer(SearchBar);
