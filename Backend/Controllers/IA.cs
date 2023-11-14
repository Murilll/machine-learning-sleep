using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace Backend.Controllers;

[ApiController]
[Route("IA")]
public class IA : ControllerBase
{
    [HttpGet("")]
    public async Task<string> RequestIA()
    {
        using (HttpClient httpClient = new HttpClient())

        try
        {
            string url = "http://localhost:3030/IA";

            HttpResponseMessage response = await httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string conteudo = await response.Content.ReadAsStringAsync();
                Console.WriteLine(conteudo);
                return conteudo;
            }
            else
            {
                Console.WriteLine($"Erro na requisição: {response.StatusCode} - {response.ReasonPhrase}");
                return "erro";
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ocorreu um erro: {ex.Message}");
            return "erro";
        }
    }
}
