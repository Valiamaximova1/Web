export default function PassengersStepper(
  {value,onChange}:{value:number; onChange:(v:number)=>void}
){
  const dec = ()=> onChange(Math.max(1, value-1));
  const inc = ()=> onChange(Math.min(9, value+1));
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="iconbtn" onClick={dec} aria-label="decrease">–</button>
      <div className="min-w-12 text-center font-semibold">{value}</div>
      <button type="button" className="iconbtn" onClick={inc} aria-label="increase">+</button>
    </div>
  );
}
