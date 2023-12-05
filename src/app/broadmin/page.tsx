'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/index';
import { AdminLayout } from '../components/index';
import styles from './page.module.css';

export default function BroAdmin() {
    const [activeNav, setActiveNav] = useState<number>(0);
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const { push } = useRouter();

    useEffect(() => {
        if (!accessToken && !loggedIn) {
            push('/');
        }
    }, [accessToken, loggedIn, push]);

    useEffect(() => {
        setActiveNav(0);
    }, [])

    return (
        <div className={styles.brologin_page}>
            <AdminLayout setActiveNav={setActiveNav} activeNav={activeNav}>
                <>{activeNav}</>
            </AdminLayout>
        </div>
    )
}