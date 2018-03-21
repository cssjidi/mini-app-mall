import { observable, action, map, transaction, ObservableMap, computed, extendObservable } from '../libs/mobx.min.js'
import FetchStore from 'FetchStore.js'
import filter from '../utils/filter.js'
class ProductStore extends FetchStore {
  constructor() {
    super()
    extendObservable(this, {
      products: observable.map({}),
      cursor: observable,
      productId: observable,
      categories: observable.map({}),
      recommends: observable.map({}),
      search: observable.array([]),
      paging: observable({
        nz: {
          id: 'nz',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        jtjz: {
          id: 'jtjz',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        sp: {
          id: 'sp',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        my: {
          id: 'my',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        mzgh: {
          id: 'mzgh',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        nanz: {
          id: 'nanz',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        smjd: {
          id: 'smjd',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        xbps: {
          id: 'xbps',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        ydhw: {
          id: 'ydhw',
          page: 1,
          limit: 15,
          isFetch: true,
        },
        ny: {
          id: 'ny',
          page: 1,
          limit: 15,
          isFetch: true,
        },
      }),
      get getProducts() {
        return filter(this.products.values(), item => item.cat_name === this.cursor)
      },
      get getSearch() {
        return this.search
      },
      get getRecommends() {
        return this.recommends.values()
      },
      get getTitle() {
        return this.categories.get(this.cursor)
      },
      get getCategories() {
        return this.categories.values()
      },
      get getDetail() {
        return this.products.get(this.productId)
      },
      setProducts: action((data) => {
        Object.keys(data).forEach(key => {
          this.products.set(data[key].id, data[key])
        })
      }),
      setRecommends: action((data) => {
        Object.keys(data).forEach(key => {
          this.recommends.set(data[key].id, data[key])
        })
      }),
      setSearch: action((data) => {
        this.search = data
        Object.keys(data).forEach(key => {
          this.products.set(data[key].id, data[key])
        })
      }),
      setCate: action(data => {
        Object.keys(data).forEach(key => {
          if (key === 'id') return
          this.categories.set(key, {
            id: key,
            name: data[key],
          })
        })
      }),
      setCursor: action(cateId => this.cursor = cateId),
      setProductId: action(productId => this.productId = productId),
      fetchProducts: action((cateId) => {
        const { page, limit } = this.paging[cateId]
        const pageUrl = `/api/coupon/${cateId}?page=${page}&limit=${limit}`
        this.start({
          method: 'GET',
          endpoint: pageUrl,
          successAction: action((data) => {
            this.paging[cateId].isFetch = false
            if (data.length === 0) return
            this.setProducts(data)
          }),
          msgReq: '努力加载中',
        })
      }),
      fetchCate: action(() => {
        this.start({
          method: 'GET',
          endpoint: '/api/category',
          successAction: action((data) => {
            this.setCate(data)
          }),
          msgReq:false,
        })
      }),
      fetchSearch: action((word) => {
        this.start({
          method: 'GET',
          endpoint: `/api/search/${word}`,
          successAction: action((data) => {
            this.setSearch(data)
          }),
          msgReq: '结果加载中',
        })
      }),
      fetchRecommend: action(() => {
        const pageUrl = `/api/recommend/${this.productId}`
        this.start({
          method: 'GET',
          endpoint: pageUrl,
          successAction: action((data) => {
            if (data.length === 0) return
            this.setRecommends(data)
          }),
          msgReq: '努力加载中',
        })
      }),
      fetchDetail: action(() => {
        const pageUrl = `/api/recommend/${this.productId}`
        this.start({
          method: 'GET',
          endpoint: pageUrl,
          successAction: action((data) => {
            if (data.length === 0) return
            this.setRecommends(data)
          }),
          msgReq: '努力加载中',
        })
      }),
    })
  }
}

const productStore = new ProductStore()
export default productStore