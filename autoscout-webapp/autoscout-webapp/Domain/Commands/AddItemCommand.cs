namespace Autoscout.Domain.Commands
{
    public class AddItemCommand
    {
        public string List { get; set; }

        public string Title { get; set; }

        public string CommandId { get; set; }

        public string CallBack { get; set; }
    }
}