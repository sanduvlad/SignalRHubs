using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRHubs.Entities
{
    public class Snake
    {
        public List<SnakeTail> SnakeTail { get; set; }
        public Snake()
        {
            SnakeTail = new List<SnakeTail>();
        }

        public Snake(int length)
        {
            SnakeTail = new List<SnakeTail>();
            for (int i = 0; i < length; i++)
            {
                SnakeTail.Add(new Entities.SnakeTail() { X = 0, Y = 0 });
            }
        }

        public List<SnakeTail> MoveToNewCoord(int xAxis, int yAxis)
        {
            var head = SnakeTail[0];
            SnakeTail[0].X += xAxis;
            SnakeTail[0].Y += yAxis;
        }
    }

    public class SnakeTail
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
