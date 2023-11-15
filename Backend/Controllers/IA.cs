using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("IA")]
public class IA : ControllerBase
{
    [HttpPost("")]
    [EnableCors("MainPolicy")]
    public async Task RequestIA([FromBody] PersonData dados)
    {
        using (HttpClient httpClient = new HttpClient())

        try
        {
            string url = "http://localhost:3030/IA";

            HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, dados);

            if (response.IsSuccessStatusCode)
            {
                string conteudo = await response.Content.ReadAsStringAsync();
                Console.WriteLine(conteudo);
            }
            else
                Console.WriteLine($"Erro na requisição: {response.StatusCode} - {response.ReasonPhrase}");
               
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ocorreu um erro: {ex.Message}"); 
        }
    }
}
