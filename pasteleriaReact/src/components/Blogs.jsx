function Blogs() {
    return (
            // < !--noticiias -- >
        <section class="py-5">
            <div class="container">
                <div class="row mb-4">
                    <div class="col text-center">
                        <h2 class="fw-bold">DATO CURIOSO 1</h2>
                    </div>
                </div>
                {/* <!-- caso 1 --> */}
                <div class="row align-items-center mb-5">
                    <div class="col-md-6">
                        <img src="img/torta13.png" alt="Imagen Caso 1" class="img-fluid rounded"/>
                    </div>
                    <div class="col-md-6">
                        <h4>Torta Vegana Premiada a Nivel Nacional</h4>
                        <p>
                            Nuestra Torta Vegana de Chocolate fue galardonada con el Primer Lugar en el Concurso Nacional de
                            Repostería Sustentable 2025, destacando por su textura húmeda, sabor intenso y compromiso con
                            ingredientes 100% libres de origen animal. ¡Una delicia que conquista paladares y corazones!
                        </p>
                        <a href="#" class="btn btn-primary">VER CASO</a>
                    </div>
                </div>
                {/* <!-- caso 2 --> */}
                <div class="row mb-4">
                    <div class="col text-center">
                        <h2 class="fw-bold">DATO CURIOSO 2</h2>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-6 order-md-2">
                        <img src="img/torta7.png" alt="Imagen Caso 2" class="img-fluid rounded"/>
                    </div>
                    <div class="col-md-6 order-md-1">
                        <h4> La Torta Sin Azúcar Más Recomendada</h4>
                        <p>
                            Un estudio realizado por la Asociación Chilena de Nutrición reveló que nuestra Torta Sin Azúcar
                            de Naranja es una de las opciones más recomendadas para personas que buscan reducir el consumo
                            de azúcar sin renunciar al sabor. Endulzada naturalmente y con aroma cítrico irresistible, ¡es
                            salud en cada bocado! </p>
                        <a href="#" class="btn btn-primary">VER CASO</a>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Blogs;