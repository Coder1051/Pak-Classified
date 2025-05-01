import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'
import Navigation from '../components/navbar'

const SiteLayout = () => {
    return (
        <>
            <Navigation/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
export default SiteLayout
