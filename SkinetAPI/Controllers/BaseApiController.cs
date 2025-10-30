using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SkinetAPI.RequestHelpers;

namespace SkinetAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected async Task<ActionResult> CreatePagedResult<T>(IGenericRepository<T> repository, ISpecification<T> spec,
            int pageIndex, int pageSize) where T : BaseEntity
        {
            var items = await repository.ListAsync(spec);
            var itemCount = await repository.CountAsync(spec);

            var pagination = new Pagination<T>(pageIndex, pageSize, itemCount, items);

            return Ok(pagination);
        }
    }
}
