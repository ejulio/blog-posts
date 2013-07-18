using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace relational_operator
{
    class Program
    {
        static void Main(string[] args)
        {
            Matrix m1 = new Matrix();
            Matrix m2 = new Matrix();

            Task<bool> result = m1 == m2;

            Console.WriteLine("Alguma operação para ser executada enquanto a comparação acontece");

            if (result.Result)
            {
                Console.WriteLine("Valores iguais");
            }

            Console.ReadKey();
        }
    }

}
