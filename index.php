<?php 
    define('UPLOAD_DIR', 'submissions/');
    define('BASE_URL', 'https://laugfs-super.prvw.ceynet.asia/');

    $ogPage = (isset($_GET['uid']) && is_file('submissions/'.strip_tags($_GET['uid'])));

    if($ogPage){
        $superPaintingPath = UPLOAD_DIR.$_GET['uid'];
        $superPage = BASE_URL.'?uid='.strip_tags($_GET['uid']);
        $tags = explode('-', strip_tags($_GET['uid']));
        $childName = $tags['2'];
    }
?>
<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <title>Super Painter</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css">
    <link rel="stylesheet" href="assets/fonts/fonts.css">
    <link rel="stylesheet" href="style.css">

<?php 
    if($ogPage){ ?>
        <meta property="fb:app_id"          content="1294688194235622" /> 
        <meta property="og:type"            content="article" /> 
        <meta property="og:url"             content="<?php echo $superPage; ?>" /> 
        <meta property="og:title"           content="<?php echo $childName.' just took part in LAUGFS Super Painter contest.'; ?>" /> 
        <meta property="og:image"           content="<?php echo BASE_URL.$superPaintingPath; ?>" /> 
        <meta property="og:description"    content="LAUGFS Super Painter contest. Log in to take part in the competition and win valuable gift vouchers from ProMate." />
<?php 
    } ?>

</head>

<body>

    <section class="SuperPaint">
        <div class="container">
            <div class="d-flex">
                <div class="left-col">
                    <div class="doll1">
                        <img src="assets/images/doll1.png" alt="">
                    </div>
                    <div class="colorArea">
                        <p>Colours</p>
                        <div class="colors">
                            <div class="palette red" id="red" onclick="changeColors(this)"></div>
                            <div class="palette red1" id="red1" onclick="changeColors(this)"></div>
                            <div class="palette red2" id="red2" onclick="changeColors(this)"></div>
                            <div class="palette orange" id="orange" onclick="changeColors(this)"></div>
                            <div class="palette orange1" id="orange1" onclick="changeColors(this)"></div>
                            <div class="palette orange2" id="orange2" onclick="changeColors(this)"></div>
                            <div class="palette yellow" id="yellow" onclick="changeColors(this)"></div>
                            <div class="palette yellow1" id="yellow1" onclick="changeColors(this)"></div>
                            <div class="palette yellow2" id="yellow2" onclick="changeColors(this)"></div>
                            <div class="palette green" id="green" onclick="changeColors(this)"></div>
                            <div class="palette green1" id="green1" onclick="changeColors(this)"></div>
                            <div class="palette green2" id="green2" onclick="changeColors(this)"></div>
                            <div class="palette blue" id="blue" onclick="changeColors(this)"></div>
                            <div class="palette blue1" id="blue1" onclick="changeColors(this)"></div>
                            <div class="palette blue2" id="blue2" onclick="changeColors(this)"></div>
                            <div class="palette indigo" id="indigo" onclick="changeColors(this)"></div>
                            <div class="palette indigo1" id="indigo1" onclick="changeColors(this)"></div>
                            <div class="palette indigo2" id="indigo2" onclick="changeColors(this)"></div>
                            <div class="palette purple" id="purple" onclick="changeColors(this)"></div>
                            <div class="palette purple1" id="purple1" onclick="changeColors(this)"></div>
                            <div class="palette purple2" id="purple2" onclick="changeColors(this)"></div>
                            <div class="palette black" id="black" onclick="changeColors(this)"></div>
                            <div class="palette black1" id="black1" onclick="changeColors(this)"></div>
                            <div class="palette black2" id="black2" onclick="changeColors(this)"></div>
                        </div>
                    </div>
                </div>
                <div class="main-col">
                    <div class="logo">
                        <img src="assets/images/logo.png" alt="">
                    </div>
                    <div class="canvasArea" id="canvasarea">
                        <?php if($ogPage){ ?>
                        <img src="<?php echo $superPaintingPath; ?>">
                        <?php } else { ?>
                        <canvas id="myCanvas" width="640" height="519" style="border:5px solid #000000;">
                            Canvas not supporeted in IE 8 and earlier versions srry
                        </canvas>
                        <?php } ?>
                    </div>
                    <div class="button">
                        <?php if($ogPage){ ?>
                            <button class="btn trynow" id="btn-trynow">Try Now</button>
                    <?php } else { ?>
                            <button class="btn finish" id="btn-finish">Finish</button>
                    <?php } ?>
                    </div>
                    <div class="alert m-4 text-center">
                        <h2>Please use a larger screen.</h2>
                    </div>
                </div>
                <div class="right-col">
                    <div class="doll2">
                        <img src="assets/images/doll2.png" alt="">
                    </div>
                    <div class="tools">
                        <div class="tool">
                            <p>Size</p>
                            <form>
                                <input type="range" class="form-control-range" id="myRange" name="amountRange" value="3" min="1" max="16" oninput="this.form.amountInput.value=this.value" onclick="lineWidthRange()">
                                <input type="number" name="amountInput" min="1" max="16" value="3" oninput="this.form.amountRange.value=this.value" />
                            </form>
                        </div>
                        <div class="tool">
                            <p>Brush</p>
                            <button value="Round" id="round" onclick="lines();changeBrushStyle(this);">
                                <i class="fa-2x fa-paint-brush fas"></i>
                            </button>
                        </div>
                        <div class="tool">
                            <p>Pencil</p>
                            <button value="Square" id="square" onclick="lines();changeBrushStyle(this);">
                                <i class="fa-2x fa-pencil-alt fas"></i>
                            </button>
                        </div>
                        <div class="tool">
                            <p>Eraser</p>
                            <button onclick="changeColors(this)" id="erase">
                                <i class="fa-2x fa-eraser fas"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal -->
    <div class="modal supermodal fade" id="modalSubmissionForm" tabindex="-1" role="dialog" aria-labelledby="modalSubmission" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form class="needs-validation" name="submission" data-toggle="validator" novalidate="true">
            <div class="modal-header border-0">
            </div>
            <div class="modal-body">
                <h3 class="modal-title text-center">Please fill in your detail and submit</h3>
                    <div class="form-row pl-4 pr-4 pt-3">
                        <div class="form-group col-md-6">
                          <label for="childName">Child's Name</label>
                          <input type="text" class="form-control" id="childName" placeholder="Child's Name" required>
                          <div class="invalid-feedback">The little artist's name.</div>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="childAge">Child's Age</label>
                          <input type="text" class="form-control" id="childAge" placeholder="Child's Age" required>
                          <div class="invalid-feedback">Enter the artist's age.</div>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="parentNo">Parents Contact No</label>
                            <input type="text" class="form-control" id="parentNo" placeholder="Parent's Contact No" required>
                            <div class="invalid-feedback">Parent's contact number is required.</div>
                        </div>
                    </div>
                    
            </div>
            <div class="modal-footer border-0">
                <div class="form-row pl-4 pr-4">
                    <div class="form-group col-md-12 text-right">
                        <button type="button" class="btn btn-secondary super-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary super-primary btn-lg" id="submitSuperPainting">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </form>
        </div>
    </div>

    <div class="modal supermodal fade" id="modalThankYou" tabindex="-1" role="dialog" aria-labelledby="modalThankYou" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                <div class="modal-body text-center">
                    <h1 class="modal-title text-center mb-3" id="exampleModalLabel">Thank You!</h1>
                    
                    <div id="shareBtn" class="text-center btn btn-success btn-facebook m-3 m-3"><i class="fab fa-facebook-f"></i> &nbsp;&nbsp;Share with your friends</div>
                   
                    <h4 class="text-center p-3">Check out <a href="https://www.laugfssuper.com/">LaugfsSuper.com</a> for the latest deals.</h4>
                </div>
                <div class="modal-footer border-0">
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="images">
                <img src="assets/images/foot-left.png" alt="">
                <img src="assets/images/promate.png" alt="">
                <img src="assets/images/laugfs-super.png" alt="">
                <img src="assets/images/foot-right.png" alt="">
            </div>
        </div>
    </footer>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="https://use.fontawesome.com/releases/v5.13.1/js/all.js"></script>
    <script type="text/javascript" src="assets/js/drawing.js"></script>
    <script>
    $(document).ready(function(){
        $('.palette,.button .btn.finish').click(function(){
            $(this).append("<span></span>");
        })
    })
    
    </script>
</body>

</html>
