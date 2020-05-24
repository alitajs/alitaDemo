import React, { FC, useEffect } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import { HeroModelState, ConnectProps, connect } from 'alita';
import FreeHeroItem from '@/components/FreeHeroItem';
import styles from './index.less';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

const RadioGroup = Radio.Group;

const HeroPage: FC<PageProps> = ({ hero, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'hero/fetch',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { heros, filterKey = 0, freeheros = [], itemHover = 0 } = hero;

  const onChange = (e) => {
    dispatch!({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  const onItemHover = (e) => {
    dispatch!({
      type: 'hero/save',
      payload: {
        itemHover: e,
      },
    });
  };

  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <Row className={styles.freehero}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {freeheros.map((data: any, index: number) => (
                <FreeHeroItem
                  data={data}
                  itemHover={itemHover}
                  onItemHover={onItemHover}
                  thisIndex={index}
                  key={index}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(HeroPage);
