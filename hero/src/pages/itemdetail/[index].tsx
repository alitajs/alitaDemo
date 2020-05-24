import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import { ItemdetailModelState, ConnectProps, connect, router } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  itemdetail: ItemdetailModelState;
}

const ItemdetailPage: FC<PageProps> = ({ itemdetail, dispatch, match }) => {
  console.log(match);
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'itemdetail/fetch',
      payload: {
        itemId: match.params.index,
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { detail = {} } = itemdetail;

  return (
    <div className={styles.center}>
      <Button onClick={() => router.goBack()}>返回英雄列表页</Button>
      <p>{JSON.stringify(detail)}</p>
    </div>
  );
};

export default connect(({ itemdetail }: { itemdetail: ItemdetailModelState }) => ({ itemdetail }))(
  ItemdetailPage,
);
