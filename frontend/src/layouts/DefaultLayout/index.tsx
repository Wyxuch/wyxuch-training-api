import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routes';
import './style.scss'

const DefaultLayout: FC = ({children}) => {
    return (
        <>
            <nav className='nav'>
                {routes.map(({path, displayName}) => (
                    <NavLink key={displayName} to={path} className={({isActive}) => `nav-link ${isActive && 'active'}` }>
                        {displayName}
                    </NavLink>
                ))}
            </nav>
            <main className='main'>
                {children}
            </main>
        </>
    )
}

export default DefaultLayout