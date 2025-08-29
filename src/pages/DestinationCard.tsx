type Props = { route:string; price:string; img?:string; };

export default function DestinationCard({route,price,img}:Props){
  return (
    <div className="group overflow-hidden rounded-2xl glass border border-black/10 hover:shadow-2xl transition">
      <div className="aspect-[16/10] bg-gradient-to-br from-sky-100 to-fuchsia-100"
           style={img?{backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center'}:undefined}/>
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold">{route}</div>
          <div className="text-slate-500 text-sm">Direct • 2h 45m</div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-extrabold">{price}</div>
          <button className="btn-ghost mt-1">View</button>
        </div>
      </div>
    </div>
  );
}
