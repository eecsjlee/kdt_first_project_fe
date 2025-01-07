export default function GallaryCard({title, location, Ttag}) {
    const Ttags = (Ttag.includes(',')? Ttag.split(',') : [...Ttag])
                    .map(item=>
                        <span className="inline-block bg-gray-200 
                                            rounded-full px-3 py-1 text-sm 
                                            font-semibold text-gray-700 
                                            mr-2 mb-2"
                                            key={item}>
                                            {item}
                        </span>
                    )
        
  return (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">
                        {location}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {Ttags}
                </div>
        </div>
  );
}