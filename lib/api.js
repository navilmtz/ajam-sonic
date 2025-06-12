import http from "./httpConfig";

const Api = {
    getApi: async (url) => {
        let res = await http.get(url);
        return res.data;
    },
    getProducts: async (url) => {
        let res = await http.get(url);
        const headers = res.headers['x-wp-totalpages'];
        const data =  res.data;
        return {data , headers};
    },
    getCategories: async (url) => {
        try {
            let res = await http.get(url, {
                auth: {
                    username: 'ck_646bfbf1d62018b52d06cf80d722cb8cf612cc2f',
                    password: 'cs_231a90e015db4f704691483d849ee40379780314'
                }
            });
            return res.data;
        } catch (error) {
            return [];
        }
    }
}

export default Api;