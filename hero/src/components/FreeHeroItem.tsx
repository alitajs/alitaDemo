import React from 'react';

interface FreeHeroItemProps {
  data: any;
  thisIndex: number;
  onItemHover: Function;
  itemHover: number;
}
const FreeHeroItem: React.FC<FreeHeroItemProps> = ({ data, thisIndex, onItemHover, itemHover }) => {
  if (!data || !data.ename) return null;
  return (
    <img
      onMouseEnter={() => {
        // eslint-disable-next-line no-unused-expressions
        itemHover !== thisIndex && onItemHover(thisIndex);
      }}
      style={{
        borderRadius: '5px',
        height: '69px',
        margin: '5px',
        width: itemHover === thisIndex ? '224px' : '69px',
      }}
      src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${data.ename}/${data.ename}${
        itemHover === thisIndex ? '-freehover.png' : '.jpg'
      }`}
    />
  );
};
export default FreeHeroItem;
