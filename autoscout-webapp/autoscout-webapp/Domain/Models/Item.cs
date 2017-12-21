namespace Autoscout.Domain.Models
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Item : TableEntity
    {
        public Item(string list, string rk)
        {
            PartitionKey = list;
            RowKey = rk;
        }

        public Item()
        {
        }

        public string Title { get; set; }

        public long TransactionId { get; set; }
    }
}