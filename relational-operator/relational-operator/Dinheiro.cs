using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace relational_operator
{
    public class Dinheiro
    {
        public decimal Valor { get; set; }

        public Dinheiro Add(Dinheiro quantidade)
        {
            return new Dinheiro { Valor = Valor + quantidade.Valor };
        }

        public static Dinheiro operator +(Dinheiro esquerda, Dinheiro direita)
        {
            return esquerda.Add(direita);
        }

        public Dinheiro Retirar(Dinheiro quantidade)
        {
            return new Dinheiro { Valor = Valor - quantidade.Valor };
        }

        public static Dinheiro operator -(Dinheiro esquerda, Dinheiro direita)
        {
            return esquerda.Retirar(direita);
        }

        public static object operator <(Dinheiro esquerda, Dinheiro direita)
        {
            return new Object();
        }

        public static object operator >(Dinheiro esquerda, Dinheiro direita)
        {
            return new Object();
        }
    }
}
