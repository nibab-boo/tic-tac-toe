import { useClickContextCheck } from './../App'
const TickBox = ({ row, col }) => {
  const handleClick = useClickContextCheck();
  return (
    <td data-row={row} data-col={col} onClick={(e)=>{ handleClick(e) }}></td>
  );
};

export default TickBox;