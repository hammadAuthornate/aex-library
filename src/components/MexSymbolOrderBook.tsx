 
// const MexSymbolOrderBook = ({ selectedSymbol }: { selectedSymbol: string }) => {
// //   const { data: orderBook, isLoading, isError, error } = useGetOrderBook(selectedSymbol);

//   if (isLoading) return <div>Loading order book...</div>;
//   if (isError) return <div>Error: {error?.message}</div>;
//   if (!orderBook) return <div>No order book data available.</div>;

//   return (
//     <div>
//       <h3>Order Book for {selectedSymbol}</h3>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>
//           <h4>Bids</h4>
//           <ul>
//             {orderBook.bids.map(([price, amount]: [string, string]) => (
//               <li key={price}>
//                 {price} - {amount}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h4>Asks</h4>
//           <ul>
//             {orderBook.asks.map(([price, amount]: [string, string]) => (
//               <li key={price}>
//                 {price} - {amount}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MexSymbolOrderBook;
