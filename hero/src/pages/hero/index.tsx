import React, { FC, useEffect } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import { HeroModelState, ConnectProps, connect } from 'alita';
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
  const { heros, filterKey = 0 } = hero;

  const onChange = (e) => {
    console.log(e.target.value);
    dispatch!({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div className={styles.center}>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {heros
          .filter((item: any) => filterKey === 0 || item.hero_type === filterKey)
          .reverse()
          .map((item: any) => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              />
              <p>{item.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(HeroPage);
