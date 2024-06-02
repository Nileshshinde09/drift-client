import { useState, useEffect, useRef } from 'react';

const usePagination = (fetchData) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
  
    const loadMore = async () => {
      if (loading || !hasMore) return;
  
      setLoading(true);
      try {
        const newData = await fetchData(page);
        if (newData && newData.length > 0) {
          setData(prevData => [...prevData, ...newData]);
          setPage(prevPage => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error loading more data:', error);
      }
      setLoading(false);
    };
  
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {
          loadMore();
        }
      }
    };
  
    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }, [loading, hasMore]);
  
    useEffect(() => {
      loadMore();
    }, []);

    return [ data, containerRef, loading, hasMore ];
};

export { usePagination }