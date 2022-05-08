
const TickBox = ({ row, col, click }) => {

  return (
    <td data-row={row} data-col={col} onClick={(e)=>{
      click(e)
      }}>
 
    </td>
  );
};

export default TickBox;