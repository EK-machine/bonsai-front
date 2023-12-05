'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/index';
import { AdminLayout } from '../components/index';
import styles from './page.module.css';

export default function BroAdmin() {
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const { push } = useRouter();

    useEffect(() => {
        if (!accessToken && !loggedIn) {
            push('/');
        }
    }, [accessToken, loggedIn, push]);

    return (
        <div className={styles.brologin_page}>
            <AdminLayout>
                <>here edit</>
            </AdminLayout>
        </div>
    )
}