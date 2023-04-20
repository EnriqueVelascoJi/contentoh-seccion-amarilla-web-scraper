import Image from "next/image"

export default function Table({restaurants}) {

    return (
        
        
    <div className="container mx-auto my-10 relative overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:bg-indigo-950 dark:text-white">
                <tr>
                    
                    <th scope="col" className="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Domicilio
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Teléfono
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Web Site
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    restaurants.map(restaurant => (
                        <tr key={restaurant.id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <span>{restaurant.name}</span>
                                <div className="flex justify-center">
                                    <Image
                                        alt={restaurant.img}
                                        src={restaurant.img}
                                        height={60}
                                        width={120}
                                    />
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {restaurant.address}
                            </td>
                            <td className="px-6 py-4">
                                <a href={`tel:+${restaurant.contact}`} className="font-medium text-blue-300 dark:text-blue-500 hover:underline">{restaurant.contact}</a>
                            </td>
                            <td className="px-6 py-4">
                                <a href={`mailto:${restaurant.email && restaurant.email.split(',')[2].slice(1, -1)}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{restaurant.email && restaurant.email.split(',')[2].slice(1, -1)}</a>
                                
                            </td>
                            <td className="px-10 py-4">
                                <a href={restaurant.webSite} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                </a>
                            </td>
                        </tr>
                    ))
                }
                
                
            </tbody>
        </table>
    </div>


    )
}