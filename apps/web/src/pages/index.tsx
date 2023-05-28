import { useSidebarContext } from '@/hooks/useSidebar';
import { NextPageWithLayout } from '@/pages/_app';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import qs from 'qs';
import { SidebarLayout } from '@/layouts/SidebarLayout';

const Cars: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return <div>Hello, welcome to the main page! </div>;
};

Cars.getLayout = SidebarLayout;

export default Cars;
