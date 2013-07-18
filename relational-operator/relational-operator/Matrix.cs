using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace relational_operator
{
    public class Matrix
    {
        public static Task<bool> operator ==(Matrix lhs, Matrix rhs)
        {
            return Task.Run<bool>(() =>
            {
                Task.Delay(2000).Wait();
                return true;
            });
        }

        public static Task<bool> operator !=(Matrix lhs, Matrix rhs)
        {
            return Task.Run<bool>(() =>
            {
                Task.Delay(2000);
                return false;
            });
        }
    }
}
