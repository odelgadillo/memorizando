#pragma checksum "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5a08cc0e2e22ba94522e01ee0b25bc231f8073f1"
// <auto-generated/>
#pragma warning disable 1591
namespace Memorizando.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.AspNetCore.Components.Web.Virtualization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Memorizando;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\_Imports.razor"
using Memorizando.Shared;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
using System.Timers;

#line default
#line hidden
#nullable disable
    [Microsoft.AspNetCore.Components.RouteAttribute("/JuegoMemoria")]
    public partial class JuegoMemoria : Microsoft.AspNetCore.Components.ComponentBase, IDisposable
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.AddAttribute(1, "class", "row");
            __builder.OpenElement(2, "div");
            __builder.AddAttribute(3, "class", "col-md-8 col-lg-6 mx-auto lead");
            __builder.OpenElement(4, "h3");
            __builder.AddMarkupContent(5, "\r\n            JuegoMemoria\r\n            ");
            __builder.OpenElement(6, "span");
            __builder.AddAttribute(7, "class", "badge badge-secondary");
            __builder.AddContent(8, "Nivel ");
            __builder.AddContent(9, 
#nullable restore
#line 10 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                                                        nivel-2

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.CloseElement();
            __builder.AddMarkupContent(10, "\r\n\r\n\r\n        ");
            __builder.OpenElement(11, "div");
            __builder.AddAttribute(12, "class", "contenedorLetra");
#nullable restore
#line 16 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
             foreach (var letra in palabraRandom)
            {
                if (mostrarPalabra)
                {

#line default
#line hidden
#nullable disable
            __builder.OpenElement(13, "div");
            __builder.AddAttribute(14, "class", "letra border text-uppercase");
            __builder.OpenElement(15, "span");
            __builder.AddContent(16, 
#nullable restore
#line 21 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                               letra

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.CloseElement();
#nullable restore
#line 23 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                }
            }

#line default
#line hidden
#nullable disable
#nullable restore
#line 27 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
             foreach (var letra in palabraUsuario)
            {

#line default
#line hidden
#nullable disable
            __builder.OpenElement(17, "div");
            __builder.AddAttribute(18, "class", "letra border text-uppercase");
            __builder.OpenElement(19, "span");
            __builder.AddContent(20, 
#nullable restore
#line 30 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                           letra

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.CloseElement();
#nullable restore
#line 32 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
            }

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.AddMarkupContent(21, "\r\n\r\n        <hr>");
#nullable restore
#line 38 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
         foreach (var letra in letras)
        {

#line default
#line hidden
#nullable disable
            __builder.OpenElement(22, "input");
            __builder.AddAttribute(23, "type", "button");
            __builder.AddAttribute(24, "name", "btn-" + (
#nullable restore
#line 40 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                                            letra

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(25, "value", 
#nullable restore
#line 40 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                                                           letra

#line default
#line hidden
#nullable disable
            );
            __builder.AddAttribute(26, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 40 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                                                                              () =>SeleccionarLetra(letra)

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(27, "class", "text-uppercase btn btn-secondary botonLetra m-1");
            __builder.CloseElement();
#nullable restore
#line 41 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
        }

#line default
#line hidden
#nullable disable
            __builder.OpenElement(28, "input");
            __builder.AddAttribute(29, "type", "button");
            __builder.AddAttribute(30, "name", "Submit");
            __builder.AddAttribute(31, "value", "Go");
            __builder.AddAttribute(32, "class", "btn btn-success");
            __builder.AddAttribute(33, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 43 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
                                                                                          () => ComprobarResultado()

#line default
#line hidden
#nullable disable
            ));
            __builder.CloseElement();
            __builder.CloseElement();
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 48 "C:\Users\omarhdc\source\repos\odelgadillo\juegoLetras\Memorizando\Memorizando\Pages\JuegoMemoria.razor"
       
    Timer timer;
    const int nivelInicial = 3;
    string palabraRandom = string.Empty;
    int nivel = nivelInicial;
    string letraSeleccionada = string.Empty;
    string palabraUsuario = string.Empty;
    bool mostrarPalabra = true;
    int tiempos = 0;

    List<char> letras = new List<char>();
    private void CargarTeclado()
    {
        for (int i = 0; i < 26; i++)
        {
            char letra = (char)('a' + i);
            letras.Add(letra);
        }
    }

    private void SeleccionarLetra(char letra)
    {
        if (palabraUsuario.Count() < nivel)
        {
            palabraUsuario += letra.ToString();
        }
    }

    private void ComprobarResultado()
    {
        if (palabraRandom == palabraUsuario)
            nivel++;
        else
            nivel = nivelInicial;

        timer.Start();
        mostrarPalabra = true;
        palabraUsuario = string.Empty;
        palabraRandom = string.Empty;
        tiempos = 0;
    }

    protected override void OnInitialized()
    {
        CargarTeclado();
        timer = new Timer();
        timer.Interval = 500; // cada segundo
        timer.Elapsed += TimerOnElapsed; // ejecutar este método
        timer.Start();
    }

    private void TimerOnElapsed(object sender, ElapsedEventArgs e)
    {
        tiempos++;

        if (palabraRandom.Count() < nivel)
            palabraRandom += RandomLetter.GetLetter();

        if (tiempos > nivel)
        {
            timer.Stop();
            mostrarPalabra = false;
        }
        StateHasChanged();
    }

    public void Dispose()
    {
        if (timer != null)
        {
            timer.Dispose();
        }
    }

    static class RandomLetter
    {
        static Random _random = new Random();
        public static char GetLetter()
        {
            // This method returns a random lowercase letter.
            // ... Between 'a' and 'z' inclusize.
            int num = _random.Next(0, 26); // Zero to 25
            char let = (char)('a' + num);
            return let;
        }
    }

#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
