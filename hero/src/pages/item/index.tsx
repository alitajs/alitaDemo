import React, { FC, useEffect } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import { ItemModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

const itemType = [
  { key: 0, value: '全部' },
  { key: 1, value: '攻击' },
  { key: 2, value: '法术' },
  { key: 3, value: '防御' },
  { key: 4, value: '移动' },
  { key: 5, value: '打野' },
  { key: 7, value: '辅助' },
];

const RadioGroup = Radio.Group;

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
  const { itemList = [], filterKey = 0 } = item;

  const onChange = (e) => {
    dispatch!({
      type: 'item/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div className={styles.center}>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {itemType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>

      <Row>
        {itemList
          .filter((item: any) => filterKey === 0 || item.item_type === filterKey)
          .reverse()
          .map((item: any) => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`}
              />
              <p>{item.item_name}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default connect(({ item }: { item: ItemModelState }) => ({ item }))(ItemPage);
