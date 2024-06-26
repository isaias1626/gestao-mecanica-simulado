"use client";

import Link from "next/link";
import { userLoginService } from '@/app/services/userLoginService'
import { useRouter } from 'next/navigation';

const HeaderPage = () => {
    const router = useRouter()

    const NavItems = [
        { title: 'dashboard', path: '/dashboard/home' },
        { title: 'Gestão de servicos', path: '/dashboard/gestao-de-servicos' },
        { title: 'Gestão de peças', path: '/dashboard/gestao-de-pecas' },
        { title: 'Historico', path: '/dashboard/historico' },
        { title: 'Configurações', path: '#' },
    ]
    
    const handleLogoutClick = () => {
        userLoginService.Logout();
        router.push('/')
    };

    return ( 
        <div>
            <section className="bg-blue-400 mb-10">
            <main className="flex space-x-4 justify-end text-lg text-white py-6 pr-8">
                    {NavItems.map((item, index) => (
                        <div key={index}>
                            <Link href={item.path}>{ item.title }</Link>
                        </div>
                    ))}
                <button onClick={handleLogoutClick}>Logout</button>
            </main>
            </section>
        </div>
    );
}

export default HeaderPage;