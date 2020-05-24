import React, { FC, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ItemModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

const ItemPage: FC<PageProps> = ({ item, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'item/fetch',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { itemList = [] } = item;

  return (
    <div className={styles.center}>
      <Row>
        {itemList.reverse().map((item: any) => (
          <Col key={item.ename} span={3} className={styles.heroitem}>
            <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`} />
            <p>{item.item_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect(({ item }: { item: ItemModelState }) => ({ item }))(ItemPage);
