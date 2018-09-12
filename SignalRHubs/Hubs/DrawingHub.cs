using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRHubs.Hubs
{
    public class DrawingHub : Hub
    {
        private static int connections = 0;
        public async Task SendNewCoordinate(int x, int y)
        {
            await Clients.Others.SendAsync("ReceiveNewCoordinate", x, y);
        }

        public async Task SendMouseClickedEvent()
        {
            await Clients.Others.SendAsync("ReceiveMouseClickedEvent");
        }

        public override Task OnConnectedAsync()
        {
            connections++;
            Clients.All.SendAsync("UpdateNumberOfConnections", connections);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            connections--;
            Clients.All.SendAsync("UpdateNumberOfConnections", connections);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task ResetCanvas()
        {
            await Clients.Others.SendAsync("ResetCanvasEventReceived");
        }
    }
}
