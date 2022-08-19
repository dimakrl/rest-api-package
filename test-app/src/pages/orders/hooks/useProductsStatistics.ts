import { useEffect, useState } from 'react'
import { OrderModel, OrderStatus } from '../../../api/order/OrderModel'
import { Product, ProductStatistics } from '../../../api/product/ProductModel'
import groupBy from '../../../utils/groupBy'

const useProductsStatistics = (orders: OrderModel[]) => {
	const [productsStatistics, setProductsStatistics] = useState<
		ProductStatistics[]
	>([])

	console.log(orders, 'orders')

	useEffect(() => {
		let resultProducts: Product[] = []

		orders?.forEach(order => {
			resultProducts = resultProducts.concat(
				order.products.map(product => ({
					...product,
					statusFullInfo: order.statusFullInfo,
				}))
			)
		})

		const groupedProducts: [string, Product[]][] = Array.from(
			groupBy<Product>(resultProducts, product =>
				JSON.stringify({
					id: product.productId,
					name: product.name,
				})
			)
		)

		const productsStatisticsResult: ProductStatistics[] = []

		const filterProductsByStatus = (products: Product[], status: OrderStatus) => {
			return products.filter(
				product => product.statusFullInfo?.orderStatus === status
			)
		}

		const calculatePercent = (totalProducts = 0, valuePerStatus = 0) => {
			return ((valuePerStatus * 100) / totalProducts).toFixed(1)
		}

		groupedProducts?.forEach(([productJSON, products], index) => {
			const productShortInfo = JSON.parse(productJSON)

			const processingProducts = filterProductsByStatus(
				products,
				OrderStatus.PROCESSING
			)

			const acceptedProducts = filterProductsByStatus(
				products,
				OrderStatus.ACCEPTED
			)

			const invalidProducts = filterProductsByStatus(products, OrderStatus.INVALID)

			const rejectedProducts = filterProductsByStatus(
				products,
				OrderStatus.REJECTED
			)

			const unknownProducts = filterProductsByStatus(products, OrderStatus.UNKNOWN)

			productsStatisticsResult[index] = {
				...productShortInfo,
				processingCount: {
					count: processingProducts?.length,
					percent: calculatePercent(products?.length, processingProducts?.length),
				},
				acceptedCount: {
					count: acceptedProducts?.length,
					percent: calculatePercent(products?.length, acceptedProducts?.length),
				},
				rejectedCount: {
					count: rejectedProducts?.length,
					percent: calculatePercent(products?.length, rejectedProducts?.length),
				},
				invalidCount: {
					count: invalidProducts?.length,
					percent: calculatePercent(products?.length, invalidProducts?.length),
				},
				unknownCount: {
					count: unknownProducts?.length,
					percent: calculatePercent(products?.length, unknownProducts?.length),
				},
			}
		})

		setProductsStatistics(productsStatisticsResult)
	}, [orders])

	return productsStatistics
}

export default useProductsStatistics
