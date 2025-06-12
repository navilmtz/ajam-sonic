'use client'
import Api from '@/lib/api';
import React, { useEffect, useState } from 'react'

export default function useFetchSiteData() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const [siteData, setSiteData] = useState([]);

  async function fetchData() {
    const response = await Promise.all([
        Api.getMenu(),
        Api.getLogo()
    ]);

    setMenuList(response[0]);
    setSiteData(response[1]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {siteData, menuList, isLoading};
}
