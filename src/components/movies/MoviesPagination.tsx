import React from "react";
import { Pagination } from "antd";
import { observer } from "mobx-react";
import MoviesStore from "../../store/MoviesStore";

interface Props {
    total: number
    pageOptions: {
        from: number;
        to: number;
    },
    setPageOptions: (value: { from: number; to: number }) => void
};

const MoviesPagination: React.FC<Props> = (props) => {

  const onChangePageSizeHandler = (page: number, pageSize: number) => {
    MoviesStore.setPaginationPage(page);
    props.setPageOptions({
      from: (page - 1) * pageSize,
      to: (page - 1) * pageSize + pageSize,
    });
  };

  const onShowSizeChangeHandler = (current: number, size: number) => {
    const currentPage: number = current === 0 ? 1 : current;
    props.setPageOptions({ from: currentPage * size, to: currentPage * size + size });
    MoviesStore.setPaginationSize(size);
  };

  return (
    <Pagination
      total={props.total}
      current={MoviesStore.moviesPaginationPage}
      pageSize={MoviesStore.moviesCurrentPaginationSize}
      showSizeChanger={true}
      onChange={onChangePageSizeHandler}
      onShowSizeChange={onShowSizeChangeHandler}
      pageSizeOptions={[4, 8, 10, 20]}
    />
  );
};

export default observer(MoviesPagination);
